import bpy
import os

out_path = r"c:\\Users\\demag\\OneDrive - UPV EHU\\Informatica\\VS Code\\BISKY\\ByM\\ROCKETS\\atlas\\atlas.glb"
os.makedirs(os.path.dirname(out_path), exist_ok=True)

bpy.ops.export_scene.gltf(
    filepath=out_path,
    export_format='GLB',
    export_apply=True,
    export_texcoords=True,
    export_normals=True,
    export_materials='EXPORT',
    export_yup=True
)
print('EXPORTED:', out_path)
