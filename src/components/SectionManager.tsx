import { DndContext, closestCenter } from "@dnd-kit/core";
import { useState } from "react";

function SectionManager() {
  const [sections, setSections] = useState([
    "Hero Section",
    "Pricing Section",
    "Testimonial Section",
    "Image Section"
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sections.indexOf(active.id);
      const newIndex = sections.indexOf(over.id);
      const updatedSections = [...sections];
      updatedSections.splice(oldIndex, 1);
      updatedSections.splice(newIndex, 0, active.id);
      setSections(updatedSections);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 Reorder Sections</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {sections.map((section) => (
          <div
            key={section}
            id={section}
            className="p-4 my-2 bg-gray-100 rounded shadow cursor-pointer"
          >
            {section}
          </div>
        ))}
      </DndContext>
    </div>
  );
}

export default SectionManager;
