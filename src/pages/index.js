import login from './login';
import { home, postDetail } from './posts';
import { hubList, createHub } from './hubs';
import { admins, createAdmin, updateAdmin, adminDetail } from './admins';
import { employeeList, createEmployee, updateEmployee } from './employee';
import {
  categories,
  createCategory,
  updateCategory,
  categoryDetail,
} from './categories/index';
import {
  createProductType,
  updateProductType,
  productTypeDetail,
} from './productTypes';
import profile from './profile';
import notFound from './404';

export default {
  login,
  home,
  postDetail,
  admins,
  createAdmin,
  updateAdmin,
  adminDetail,
  profile,
  categories,
  createCategory,
  updateCategory,
  categoryDetail,
  createProductType,
  updateProductType,
  productTypeDetail,
  notFound,

  hubList,
  createHub,
  employeeList,
  createEmployee,
  updateEmployee
};
