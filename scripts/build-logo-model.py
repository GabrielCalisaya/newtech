"""Build a compact branded GLB from the current New Tech logo using stdlib only."""

import json
import struct
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "img" / "newtech-logo.png"
OUTPUT = ROOT / "experience-src" / "public" / "newtech-object.glb"

buffer = bytearray()
buffer_views = []
accessors = []


def add_buffer_view(data: bytes, target=None):
    while len(buffer) % 4:
        buffer.append(0)
    offset = len(buffer)
    buffer.extend(data)
    view = {"buffer": 0, "byteOffset": offset, "byteLength": len(data)}
    if target is not None:
        view["target"] = target
    buffer_views.append(view)
    return len(buffer_views) - 1


def add_accessor(values, components, component_type, kind, target):
    code = "f" if component_type == 5126 else "H"
    flat = [item for row in values for item in (row if isinstance(row, (tuple, list)) else [row])]
    view = add_buffer_view(struct.pack("<" + code * len(flat), *flat), target)
    accessor = {
        "bufferView": view,
        "componentType": component_type,
        "count": len(values),
        "type": kind,
    }
    if kind == "VEC3" and target == 34962:
        accessor["min"] = [min(row[i] for row in values) for i in range(3)]
        accessor["max"] = [max(row[i] for row in values) for i in range(3)]
    accessors.append(accessor)
    return len(accessors) - 1


def make_primitive(faces, material):
    positions, normals, uvs, indices = [], [], [], []
    for corners, normal, texcoords in faces:
        start = len(positions)
        positions.extend(corners)
        normals.extend([normal] * 4)
        uvs.extend(texcoords)
        indices.extend([start, start + 1, start + 2, start, start + 2, start + 3])
    return {
        "attributes": {
            "POSITION": add_accessor(positions, 3, 5126, "VEC3", 34962),
            "NORMAL": add_accessor(normals, 3, 5126, "VEC3", 34962),
            "TEXCOORD_0": add_accessor(uvs, 2, 5126, "VEC2", 34962),
        },
        "indices": add_accessor(indices, 1, 5123, "SCALAR", 34963),
        "material": material,
    }


width, height, depth = 1.52, 0.75, 0.10
l, r, b, t, back, front = -width, width, -height, height, -depth, depth
uvs = [(0, 1), (1, 1), (1, 0), (0, 0)]

front_face = [
    ([ (l, b, front), (r, b, front), (r, t, front), (l, t, front) ], (0, 0, 1), uvs)
]
side_faces = [
    ([ (l, b, back), (l, b, front), (l, t, front), (l, t, back) ], (-1, 0, 0), uvs),
    ([ (r, b, front), (r, b, back), (r, t, back), (r, t, front) ], (1, 0, 0), uvs),
    ([ (l, t, front), (r, t, front), (r, t, back), (l, t, back) ], (0, 1, 0), uvs),
    ([ (l, b, back), (r, b, back), (r, b, front), (l, b, front) ], (0, -1, 0), uvs),
]
back_face = [
    ([ (r, b, back), (l, b, back), (l, t, back), (r, t, back) ], (0, 0, -1), uvs)
]

primitives = [
    make_primitive(front_face, 0),
    make_primitive(side_faces, 1),
    make_primitive(back_face, 2),
]
image_view = add_buffer_view(LOGO.read_bytes())
while len(buffer) % 4:
    buffer.append(0)

gltf = {
    "asset": {"version": "2.0", "generator": "New Tech logo model builder"},
    "scene": 0,
    "scenes": [{"nodes": [0]}],
    "nodes": [{"mesh": 0, "rotation": [0, 0, 0, 1]}],
    "meshes": [{"primitives": primitives}],
    "materials": [
        {"name": "Logo", "pbrMetallicRoughness": {"baseColorTexture": {"index": 0}, "metallicFactor": 0, "roughnessFactor": 0.75}, "doubleSided": True},
        {"name": "Orange edge", "pbrMetallicRoughness": {"baseColorFactor": [0.98, 0.29, 0.08, 1], "metallicFactor": 0.18, "roughnessFactor": 0.45}},
        {"name": "Charcoal back", "pbrMetallicRoughness": {"baseColorFactor": [0.09, 0.11, 0.15, 1], "metallicFactor": 0.05, "roughnessFactor": 0.65}},
    ],
    "textures": [{"source": 0}],
    "images": [{"bufferView": image_view, "mimeType": "image/png"}],
    "bufferViews": buffer_views,
    "accessors": accessors,
    "buffers": [{"byteLength": len(buffer)}],
}

json_chunk = json.dumps(gltf, separators=(",", ":")).encode("utf-8")
json_chunk += b" " * (-len(json_chunk) % 4)
bin_chunk = bytes(buffer)
total_length = 12 + 8 + len(json_chunk) + 8 + len(bin_chunk)
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_bytes(
    struct.pack("<4sII", b"glTF", 2, total_length)
    + struct.pack("<I4s", len(json_chunk), b"JSON")
    + json_chunk
    + struct.pack("<I4s", len(bin_chunk), b"BIN\0")
    + bin_chunk
)
print(f"Built {OUTPUT.relative_to(ROOT)} ({OUTPUT.stat().st_size} bytes)")
