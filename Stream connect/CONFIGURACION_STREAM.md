# Conexión de los equipos y configuración del streaming del lanzamiento

Esta guía explica cómo compartir la cámara del cohete, las cámaras de la zona y la telemetría entre dos equipos situados en redes diferentes.

- **Dispositivo emisor:** portátil de aviónica situado en la mesa de lanzamiento. Puede usar **Windows o Linux**; está conectado a la red local de las cámaras y envía la cámara del cohete mediante OBS.
- **Dispositivo receptor:** portátil encargado de producir y emitir el stream. Puede usar **Windows o Linux**; recibe la cámara del cohete y accede al resto de cámaras a través del emisor.

Los dos dispositivos se comunican mediante **Tailscale**. El emisor funciona además como *router de subred* para que el receptor pueda acceder a los dispositivos de la red `192.168.0.0/24`.

> [!IMPORTANT]
> Las direcciones RTSP incluidas al final contienen usuarios y contraseñas en texto plano. Este documento no debe publicarse ni compartirse fuera del equipo autorizado.

## 1. Esquema de la conexión

```text
Cámaras RTSP y telemetría (192.168.0.0/24)
                         │
                         │ Red local de la mesa
                         ▼
          Dispositivo emisor (Windows o Linux)
             - OBS: SRT en modo listener
             - Router de subred Tailscale
                         │
                         │ Tailscale a través de Internet
                         ▼
          Dispositivo receptor (Windows o Linux)
             - OBS: SRT en modo caller
             - Fuentes RTSP y telemetría
             - Producción del stream final
```

Antes de empezar, el emisor debe poder abrir localmente las cámaras `192.168.0.103`, `.105`, `.109` y `.111`, además de la telemetría en `192.168.0.112`. Ambos portátiles deben tener conexión a Internet.

## 2. Instalar y conectar Tailscale

### 2.1. Dispositivo emisor (Windows o Linux)

#### Opción A: Windows

1. Descargar e instalar Tailscale desde la [guía oficial para Windows](https://tailscale.com/docs/install/windows).
2. Abrir Tailscale e iniciar sesión en la cuenta o *tailnet* que se utilizará también en el receptor.
3. Abrir PowerShell y comprobar la conexión:

   ```powershell
   tailscale status
   tailscale ip -4
   ```

#### Opción B: Linux

1. Instalar Tailscale siguiendo la [guía oficial para Linux](https://tailscale.com/docs/install/linux). En distribuciones compatibles se puede usar:

   ```bash
   curl -fsSL https://tailscale.com/install.sh | sh
   ```

2. Iniciar Tailscale:

   ```bash
   sudo tailscale up
   ```

3. Abrir el enlace de autenticación mostrado por el comando e iniciar sesión en la cuenta o *tailnet* que se utilizará también en el receptor.

4. Comprobar la conexión y anotar la dirección IPv4 de Tailscale:

   ```bash
   tailscale status
   tailscale ip -4
   ```

### 2.2. Dispositivo receptor (Windows o Linux)

#### Opción A: Windows

1. Descargar e instalar Tailscale desde la [guía oficial para Windows](https://tailscale.com/docs/install/windows).
2. Abrir Tailscale e iniciar sesión en la misma *tailnet* que el emisor.
3. En PowerShell, comprobar que aparecen los dos equipos:

   ```powershell
   tailscale status
   ```

Windows acepta automáticamente las rutas de subred que hayan sido anunciadas y aprobadas.

#### Opción B: Linux

1. Instalar Tailscale siguiendo la [guía oficial para Linux](https://tailscale.com/docs/install/linux).
2. Iniciar sesión en la misma *tailnet* que el emisor:

   ```bash
   sudo tailscale up
   ```

3. Activar la aceptación de rutas de subred, ya que Linux no lo hace automáticamente:

   ```bash
   sudo tailscale set --accept-routes
   ```

4. Comprobar que aparecen los dos equipos:

   ```bash
   tailscale status
   ```

> [!WARNING]
> En los ejemplos se utiliza `100.81.94.95` como dirección Tailscale del emisor, pero esta dirección puede cambiar después de reinstalarlo o volverlo a registrar. Se debe usar siempre la dirección devuelta en ese momento por `tailscale ip -4` o `tailscale status`.

## 3. Compartir la red de las cámaras mediante Tailscale

Las cámaras no ejecutan Tailscale. Para alcanzarlas desde el receptor, el portátil emisor debe anunciar la red `192.168.0.0/24` como una ruta de subred.

### 3.1. Activar el reenvío IPv4 en el emisor

Solo se debe seguir el apartado correspondiente al sistema operativo del emisor.

#### Si el emisor utiliza Windows

Abrir **PowerShell como administrador** y habilitar el reenvío IPv4 en las interfaces activas:

```powershell
Get-NetIPInterface -AddressFamily IPv4 |
    Where-Object ConnectionState -eq 'Connected' |
    Set-NetIPInterface -Forwarding Enabled
```

Comprobar el resultado:

```powershell
Get-NetIPInterface -AddressFamily IPv4 |
    Where-Object ConnectionState -eq 'Connected' |
    Format-Table InterfaceAlias, Forwarding
```

Las interfaces que conectan Windows con Tailscale y con la red `192.168.0.0/24` deben mostrar `Enabled`.

#### Si el emisor utiliza Linux

Ejecutar en Linux:

```bash
echo 'net.ipv4.ip_forward = 1' | sudo tee /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf
```

Comprobar que el resultado sea `1`:

```bash
sysctl net.ipv4.ip_forward
```

### 3.2. Anunciar la subred

Después de activar el reenvío, anunciar la ruta. En **Windows**, ejecutar PowerShell como administrador:

```powershell
tailscale set --advertise-routes=192.168.0.0/24
```

En **Linux**:

```bash
sudo tailscale set --advertise-routes=192.168.0.0/24
```

Si una versión antigua de Tailscale en Linux no admite `tailscale set`, se puede usar el comando de la configuración original:

```bash
sudo tailscale up --advertise-routes=192.168.0.0/24
```

### 3.3. Aprobar la ruta

1. Entrar en la [consola de administración de Tailscale](https://login.tailscale.com/admin/machines).
2. Abrir el dispositivo emisor.
3. En **Subnets**, seleccionar **Edit**.
4. Marcar `192.168.0.0/24` y pulsar **Save**.

Este procedimiento corresponde al de la documentación oficial de [routers de subred de Tailscale](https://tailscale.com/kb/1104/enable-ip-forwarding).

### 3.4. Comprobar la ruta desde el receptor

Si el receptor utiliza **Windows**, ejecutar en PowerShell:

```powershell
tailscale status
tailscale ping 100.81.94.95
Test-NetConnection 192.168.0.111 -Port 554
Test-NetConnection 192.168.0.112 -Port 80
```

Sustituir `100.81.94.95` por la IP Tailscale actual del emisor. El primer `Test-NetConnection` comprueba RTSP y el segundo, el servidor web de telemetría.

Si el receptor utiliza **Linux**, ejecutar:

```bash
tailscale status
tailscale ping 100.81.94.95
nc -vz 192.168.0.111 554
nc -vz 192.168.0.112 80
```

Si `nc` no está instalado, se puede comprobar la telemetría con `curl -I http://192.168.0.112/left` y abrir las fuentes directamente en OBS. En Linux, confirmar además que se ejecutó `sudo tailscale set --accept-routes`.

## 4. Configurar OBS en el dispositivo emisor

Algunos de los parametros configurados a continuación pueden variar para mejorar la calidad de video.

### 4.1. Añadir la cámara del cohete

En OBS, crear o seleccionar la escena que se enviará al receptor y agregar la cámara del cohete mediante el tipo de fuente que corresponda a su conexión física: **Dispositivo de captura de vídeo**, capturadora HDMI u otra entrada disponible.

Antes de continuar, verificar que la imagen de la cámara se ve correctamente en el lienzo de OBS.

### 4.2. Configurar la salida de vídeo

Abrir **Ajustes > Salida** y seleccionar **Modo de salida: Avanzado**. En la pestaña **Emisión**, configurar:

| Parámetro | Valor |
|---|---|
| Pista de audio | `1` |
| Codificador de audio | `FFmpeg AAC` |
| Codificador de vídeo | `x264` |
| Reescalar salida | Desactivado |
| Control de frecuencia | `CBR` |
| Bitrate | `2500 Kbps` |
| Tamaño de búfer personalizado | Desactivado |
| Intervalo de fotogramas clave | `0 s` (automático) |
| Preajuste de uso de CPU | `veryfast` |
| Perfil | Ninguno |
| Tune | Ninguno |
| Opciones x264 | Vacío |

### 4.3. Configurar la emisión SRT

Abrir **Ajustes > Emisión** y configurar:

| Parámetro | Valor |
|---|---|
| Servicio | `Personalizado...` |
| Servidor | `srt://0.0.0.0:7001?mode=listener` |
| Clave de transmisión | Vacía |
| Usar autenticación | Desactivado |

Aplicar los cambios y pulsar **Iniciar transmisión**. OBS quedará escuchando conexiones SRT en el puerto UDP `7001`.

Si el firewall del emisor bloquea el tráfico entrante, autorizar OBS o el puerto UDP `7001` para la interfaz/red de Tailscale.

## 5. Recibir la cámara del cohete en OBS

En el dispositivo receptor:

1. Abrir la escena donde se mostrará la cámara.
2. En **Fuentes**, pulsar **+ > Fuente multimedia**.
3. Crear una fuente llamada, por ejemplo, `Cámara del cohete`.
4. Desmarcar **Archivo local**.
5. Introducir los siguientes valores:

| Parámetro | Valor |
|---|---|
| Reiniciar la reproducción cuando la fuente esté activa | Activado |
| Búfer de red | `2 MB` |
| Entrada | `srt://100.81.94.95:7001?mode=caller` |
| Formato de entrada | Vacío / detección automática |
| Retraso de reconexión | `1 s` |
| Decodificación por hardware | Desactivada |

Cambiar `100.81.94.95` por la IP Tailscale actual del emisor. El emisor debe estar transmitiendo y en modo `listener`; el receptor debe estar en modo `caller`.

## 6. Añadir las cámaras de la zona al receptor

Estas cámaras se alcanzan mediante la ruta de subred de Tailscale. Para cada una:

1. En **Fuentes**, seleccionar **+ > Fuente multimedia**.
2. Asignar un nombre descriptivo.
3. Desmarcar **Archivo local**.
4. Activar **Reiniciar la reproducción cuando la fuente esté activa**.
5. Copiar la URL correspondiente en **Entrada**.
6. Dejar **Formato de entrada** vacío para que OBS detecte RTSP automáticamente.
7. Aceptar y comprobar la imagen antes de añadir la siguiente cámara.

| Nombre recomendado | Dirección | URL RTSP |
|---|---:|---|
| Cámara de trabajo 1 | `192.168.0.111` | `rtsp://work-cam-1:rtp-work-cam-1@192.168.0.111/stream1` |
| Cámara de trabajo 2 | `192.168.0.109` | `rtsp://work-cam-2:rtp-work-cam-2@192.168.0.109/stream1` |
| Cámara de lanzamiento 1 | `192.168.0.103` | `rtsp://launch-cam-1:rtp-launch-cam-1@192.168.0.103/stream1` |
| Cámara de lanzamiento 2 | `192.168.0.105` | `rtsp://launch-cam-2:rtp-launch-cam-2@192.168.0.105/stream1` |

Si una cámara introduce demasiado retardo, reducir progresivamente el búfer de red. Si se congela o pierde fotogramas, aumentarlo de forma moderada.

## 7. Añadir la telemetría al receptor

1. En **Fuentes**, pulsar **+ > Navegador**.
2. Crear una fuente llamada `Telemetría`.
3. Desmarcar **Archivo local** y configurar:

| Parámetro | Valor |
|---|---|
| URL | `http://192.168.0.112/left` |
| Ancho | `1920` |
| Alto | `1080` |
| Controlar audio vía OBS | Desactivado |
| Frecuencia de imágenes personalizada | Desactivada |
| CSS personalizado | `body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }` |

## 8. Orden recomendado de puesta en marcha

1. Encender la red local, las cámaras y el equipo de telemetría.
2. Encender el emisor y comprobar que tiene acceso local a todos ellos.
3. Conectar el emisor y el receptor a Internet y confirmar Tailscale con `tailscale status`.
4. Confirmar que la ruta `192.168.0.0/24` continúa aprobada.
5. Abrir OBS en el emisor, verificar la cámara del cohete e iniciar la transmisión SRT.
6. Abrir OBS en el receptor y activar primero la fuente SRT del cohete.
7. Comprobar individualmente las cuatro cámaras RTSP y la telemetría.
8. Revisar encuadres, audio, sincronización y escenas antes de iniciar el stream público.

## 9. Solución de problemas

### Los equipos no aparecen en Tailscale

- Confirmar que Tailscale está conectado en ambos equipos.
- Verificar que pertenecen a la misma *tailnet* o que el dispositivo compartido tiene los permisos necesarios.
- Ejecutar `tailscale status` en los dos equipos.

### El receptor no abre ninguna dirección `192.168.0.x`

- En el emisor Linux, confirmar que `net.ipv4.ip_forward` vale `1`; si el emisor usa Windows, confirmar que `Forwarding` está en `Enabled` para las interfaces conectadas.
- Revisar que el emisor anuncia `192.168.0.0/24`.
- Comprobar en la consola de Tailscale que la ruta está marcada y aprobada.
- Si el receptor utiliza Linux, ejecutar `sudo tailscale set --accept-routes`.
- Verificar que las reglas de acceso de la *tailnet* permiten llegar a esa subred.

### La cámara del cohete no aparece

- Confirmar que OBS está transmitiendo en el emisor.
- Revisar que la IP de la URL SRT sea la IP Tailscale actual del emisor.
- Confirmar `listener` en el emisor y `caller` en el receptor.
- Permitir OBS o UDP `7001` en el firewall del emisor.
- Desactivar y volver a activar la fuente multimedia del receptor.

### Solo falla una cámara RTSP

- Ejecutar `Test-NetConnection DIRECCION_DE_LA_CAMARA -Port 554`.
- Revisar la URL, el usuario, la contraseña y la ruta `/stream1`.
- Comprobar la cámara desde la red local del emisor para distinguir un problema de cámara de uno de Tailscale.

### Hay cortes o demasiado retraso

- Comprobar la estabilidad y velocidad de subida del emisor y de bajada del receptor.
- Reducir el bitrate SRT si la conexión no sostiene `2500 Kbps` con margen.
- Ajustar el búfer de cada fuente sin cambiar todas a la vez.
- Evitar descargas y otros streams simultáneos durante el lanzamiento.

## 10. Lista de comprobación final

- [ ] Todas las cámaras y la telemetría tienen alimentación.
- [ ] Ambos equipos aparecen conectados en `tailscale status`.
- [ ] Se ha anotado la IP Tailscale actual del emisor.
- [ ] La ruta `192.168.0.0/24` está anunciada y aprobada.
- [ ] Si el receptor usa Linux, tiene activada la opción `--accept-routes`.
- [ ] El receptor alcanza al menos una cámara por el puerto `554` y la telemetría por el `80`.
- [ ] OBS del emisor muestra la cámara del cohete y está transmitiendo SRT.
- [ ] OBS del receptor recibe la cámara del cohete.
- [ ] Las cuatro fuentes RTSP funcionan.
- [ ] La fuente de telemetría funciona a `1920 × 1080`.
- [ ] Se han revisado escenas, audio, sincronización y ancho de banda.
