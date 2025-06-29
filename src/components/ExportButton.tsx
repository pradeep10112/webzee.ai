type Props = {
  sections: string[];
};

function ExportButton({ sections }: Props) {
  const handleExport = () => {
    const content = sections.join("\n");
    alert(`Exported sections:\n\n${content}`);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
    >
      📤 Export Page
    </button>
  );
}

export default ExportButton;
