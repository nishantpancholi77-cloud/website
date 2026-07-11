document.getElementById("saveContact").addEventListener("click", () => {
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Pancholi;Nishant;;;",
    "FN:Nishant Pancholi",
    "TITLE:Software Engineer",
    "EMAIL;TYPE=INTERNET:nishantpancholi77@gmail.com",
    "URL:https://github.com/nishantpancholi77-cloud",
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vCard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Nishant-Pancholi.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});
