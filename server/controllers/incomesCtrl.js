import createError from "../utils/errorHandle.js";
import HttpCodes from "../utils/httpCodes.js";
import { countIncome } from "../services/countIncomes.js";

const countIncomeEmployee = async (req, res, next) => {
  const { country } = req.body.employee;
  const data = req.body;
  const countries = ["indonesia", "vietnam"];

  // Menentukan kondisi jikan country tidak ada maka akan melakukan return error
  if (!countries.includes(country))
    return next(createError(HttpCodes.NOT_FOUND, `Country Not Found`));

  // Mengirim data ke service
  const countTaxEmployee = countIncome(data, country);

  return res.status(HttpCodes.OK).json({
    status: true,
    message: "Get Count Income Successfully",
    data: { monthlyTax: countTaxEmployee },
  });
};

export default {
  countIncomeEmployee,
};
