export async function getSchemes() {
  // Temporary dummy API

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "PM Scholarship",
          description: "Financial assistance for eligible students.",
          documents: ["Aadhaar Card", "Income Certificate", "PAN Card"],
          portal: "https://scholarships.gov.in",
        },
      ]);
    }, 2000);
  });
}
