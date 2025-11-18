// hooks/useDownloadTicket.ts
import { useState } from "react";

export function useDownloadTicket() {
  const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false);

  const handleDownload = async (ticketIds?: string | string[]) => {
    if (!ticketIds) return;

    // Normalisasi → jadi array
    const ids = Array.isArray(ticketIds) ? ticketIds : [ticketIds];

    try {
      setIsLoadingDownload(true);

      await Promise.all(
        ids.map(async (id) => {
          const response = await fetch(`/api/download-ticket?id=${id}`);
          if (!response.ok) throw new Error("Faild to download ticket, try again");

          const blob = await response.blob();
          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = `ticket-${id}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        })
      );
    } catch (err) {
      console.error("Download failed", err);
      throw err;
    } finally {
      setIsLoadingDownload(false);
    }
  };

  return { isLoadingDownload, handleDownload };
}
