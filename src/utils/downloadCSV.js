const createCSVBlob = (data) => {
  const header =
    "COUPONCODESET_1,COUPONCODESET_2,COUPONCODESET_3,COUPONCODESET_4,COUPONCODESET_5,COUPONCODESET_6,COUPONCODESET_7,COUPONCODESET_8,COUPONCODESET_9,COUPONCODESET_10\n";
  const blobParts = [header];

  for (let i = 0; i < data.length; i += 10) {
    const row =
      data
        .slice(i, i + 10)
        .map((item) => item.uniqueId)
        .join(",") + "\n";
    blobParts.push(row);
  }

  return new Blob(blobParts, { type: "text/csv" });
};

// Download CSV
const downloadCSV = (data) => {
  const blob = createCSVBlob(data);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "uniqueIds.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default downloadCSV;
