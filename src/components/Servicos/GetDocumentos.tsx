"use client";
import { documentGetAction } from "@/actions/processData/document-get-action";
import { InfoProcess } from "@/interfaces/process-data-types";
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import getToken from "@/actions/get-token-action";

export default function GetDocumentos() {
  const [documents, setDocuments] = useState<InfoProcess[]>([]);

  useEffect(() => {
    async function loadDocuments() {
      const { data } = await documentGetAction();
      console.log(data);
      setDocuments(data);
    }
    loadDocuments();
  }, []);

  const handleDownload = async (url: string, title: string) => {
    try {
      const token = await getToken();
      console.log(token);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      saveAs(blob, title);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <main>
      <div className="m-10">
        {documents.length > 0 ? (
          documents.map((document) => (
            <div key={document.id} className="mb-4">
              <h1>Nome do documento: {document.nome}</h1>
              <h2>Tipo do documento: {document.tipo_documento}</h2>
              {document.arquivos && document.arquivos.length > 0 ? (
                document.arquivos.map((arquivo, index) => (
                  <div key={index}>
                    <p>Título: {arquivo.titulo}</p>
                    <p>Tipo: {arquivo.tipo}</p>
                    <a
                      href={arquivo.src}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visualizar arquivo
                    </a>
                    <button
                      onClick={() =>
                        handleDownload(arquivo.src, arquivo.titulo)
                      }
                      className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Baixar arquivo
                    </button>
                  </div>
                ))
              ) : (
                <p>Este documento não contém arquivos.</p>
              )}
            </div>
          ))
        ) : (
          <p>Nenhum documento disponível.</p>
        )}
      </div>
    </main>
  );
}
