// Melakukan Reduce dan Filter pemasukan dan potongan
const incomeAll = (incomeUser) => {
  const income = incomeUser.filter((item) => {
    return item.type === "earning";
  });

  const piece = incomeUser.filter((item) => {
    return item.type !== "earning";
  });

  const netIncome = income.reduce(function (acc, item) {
    return acc + item.amount;
  }, 0);

  const netPiece = piece.reduce(function (acc, item) {
    return acc + item.amount;
  }, 0);
  return { netIncome, netPiece };
};

// Menentukan potongan pajak Indonesia
const taxIndonesia = (yearIncome, monthIncome) => {
  const tax = 50000000;
  let month;
  let year;
  // Menghitung potongan Month
  if (monthIncome <= tax) {
    month = (tax * 5) / 100;
  } else if (monthIncome > tax && monthIncome < 250000000) {
    month = (tax * 10) / 100;
  } else {
    month = (tax * 15) / 100;
  }
  // Menghitung potongan Year
  if (yearIncome <= tax) {
    year = (yearIncome * 5) / 100;
  } else if (yearIncome > tax && yearIncome < 250000000) {
    year = ((yearIncome - tax) * 10) / 100;
  } else {
    year = ((yearIncome - tax) * 15) / 100;
  }
  return { year, month };
};

// Menentukan potongan pajak vietnam
const taxVietnam = (yearIncome, monthIncome) => {
  const tax = 50000000;
  let month;
  let year;
  // Menghitung potongan Month
  if (monthIncome <= tax) {
    month = (tax * 2.5) / 100;
  } else if (monthIncome > tax && monthIncome < 250000000) {
    month = (tax * 10) / 100;
  } else {
    month = (tax * 15) / 100;
  }
  // Menghitung potongan Year
  if (yearIncome <= tax) {
    year = (yearIncome * 2.5) / 100;
  } else {
    year = ((yearIncome - tax) * 7.5) / 100;
  }
  return { year, month };
};

// Memproses data
const countIncome = (data, country) => {
  const user = data;
  let netto;
  let ptkp;
  let yearlyTax;
  let monthlyTax;

  // Mengitung Semua Income
  const { netIncome, netPiece } = incomeAll(data.component_tax);

  // Menentukan PTKP
  if (user.employee.marital_status == "maried" && country == "indonesia") {
    if (user.employee.childs > 0) {
      ptkp = 75000000;
    } else {
      ptkp = 50000000;
    }
  } else if (
    user.employee.marital_status == "single" &&
    country == "indonesia"
  ) {
    ptkp = 25000000;
  } else if (user.employee.marital_status == "maried" && country == "vietnam") {
    ptkp = 30000000;
  } else if (user.employee.marital_status == "single" && country == "vietnam") {
    ptkp = 15000000;
  }

  // Menentukan % Pajak
  if (country == "indonesia") {
    netto = netIncome * 12 - ptkp;
    const { year, month } = taxIndonesia(netto, netIncome);
    yearlyTax = year + month;
    monthlyTax = (yearlyTax / 12).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  } else if (country == "vietnam") {
    netto = netIncome * 12 - netPiece * 12 - ptkp;
    const { year, month } = taxVietnam(netto, netIncome - netPiece);
    yearlyTax = year + month;
    monthlyTax = (yearlyTax / 12).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  // Output
  return monthlyTax;
};

export { countIncome };
