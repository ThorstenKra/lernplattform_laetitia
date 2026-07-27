import bpy

count = 0
for mat in bpy.data.materials:
    if mat and mat.use_nodes and mat.node_tree:
        for node in mat.node_tree.nodes:
            if node.type == 'BSDF_PRINCIPLED':
                try:
                    node.inputs['Metallic'].default_value = 0.0
                    count += 1
                except Exception:
                    pass

print("Metallic auf 0 gesetzt bei " + str(count) + " Material-Nodes")
