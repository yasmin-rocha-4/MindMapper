import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "default" });

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMermaid = async () => {
      if (!containerRef.current) return;

      try {
        const uniqueId = "diagram_" + Date.now();
        const { svg } = await mermaid.render(uniqueId, chart);

        containerRef.current.innerHTML = svg;

        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          // Força um tamanho maior
          svgElement.setAttribute("width", "100%");
          svgElement.setAttribute("height", "auto");
          svgElement.removeAttribute("style"); // Remove estilos em linha que achatam
        }
      } catch (err) {
        containerRef.current.innerHTML = `<pre style="color:red;">Erro ao gerar diagrama Mermaid</pre>`;
      }
    };

    renderMermaid();
  }, [chart]);

  return (
    <div
      ref={containerRef}
      style={{
        overflowX: "auto",
        padding: "1rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid #ccc",
        minHeight: "600px",
        width: "100%",
      }}
    />
  );
};

export default Mermaid;
