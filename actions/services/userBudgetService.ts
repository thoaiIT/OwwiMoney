import type { UserBudgetCreateType, UserBudgetUpdateType } from '@/actions/controller/userBudgetController';
import { sendLimitExceededEmail } from '@/actions/mail/sendLimitExceededEmailTemplate';
import type UserBudgetRepository from '@/actions/repositories/userBudgetRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { sendEmail } from '@/helper/lib/email';
import { getServerSession } from 'next-auth';
import { HttpStatusCodes } from '../../helper/type';

class UserBudgetService {
  private userBudgetRepository: UserBudgetRepository;

  constructor(userBudgetRepository: UserBudgetRepository) {
    this.userBudgetRepository = userBudgetRepository;
  }

  // Create User Budget
  async createUserBudget(data: UserBudgetCreateType) {
    try {
      const session = await getServerSession(options);
      const userId = (session?.user?.userId as string) || (session?.user?.id as string);
      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const userBudget = await this.userBudgetRepository.createUserBudget({ ...data, userId });
      return { message: 'User Budget Created', data: { userBudget }, status: HttpStatusCodes[201] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  // Get list User Budget by UserId
  async getListUserBudgetByUserId() {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const listResp = await this.userBudgetRepository.getListUserBudgetByUserId(userId);

    if (listResp.length === 0) {
      return { message: 'List User Budget not found', status: HttpStatusCodes[404] };
    }

    return { message: 'Success', data: { listResp }, status: HttpStatusCodes[200] };
  }

  // Get detail User Budget
  async getDetailCategoryUserBudget(userBudgetId: string) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const resp = await this.userBudgetRepository.getDetailCategoryUserBudget(userBudgetId);

    if (!resp) {
      return { message: 'User Budget not found', status: HttpStatusCodes[404] };
    }

    return { message: 'Success', data: { resp }, status: HttpStatusCodes[200] };
  }

  // Update User Budget
  async updateUserBudget(data: UserBudgetUpdateType) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);
    const userBudget = await this.userBudgetRepository.getDetailCategoryUserBudget(data.userBudgetId);

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    if (!userBudget) {
      return { message: 'User Budget not found', status: HttpStatusCodes[404] };
    }

    const resp = await this.userBudgetRepository.updateUserBudget({ ...data });
    return { message: 'Success', data: { resp }, status: HttpStatusCodes[200] };
  }

  // Update multiple User Budgets
  async updateMultipleUserBudgets(dataList: UserBudgetUpdateType[]) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const updatedMultipleUserBudgets = await this.userBudgetRepository.updateMultipleUserBudgets(dataList, userId);

    if (!updatedMultipleUserBudgets) {
      return { message: 'Update failed', status: HttpStatusCodes[422] };
    }

    return { message: 'Success', data: { updatedMultipleUserBudgets }, status: HttpStatusCodes[200] };
  }

  // Get list User Budget by Type Name
  async getListUserBudgetByTypeName(typeName: string) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const listResp = await this.userBudgetRepository.getUserBudgetByTypeName(userId, typeName);

    if (listResp.length === 0) {
      return { message: 'List User Budget not found', status: HttpStatusCodes[404] };
    }

    return { message: 'Success', data: { listResp }, status: HttpStatusCodes[200] };
  }

  // Send mail warning when reach expected limit
  async sendMailWarning(userBudgetId: string) {
    const resp = await this.userBudgetRepository.getInfoSendMail(userBudgetId);

    if (resp) {
      const template = sendLimitExceededEmail(resp);
      const subject =
        'OwwiMoney - Notify the reach expected limit category: ' +
        resp.category.name +
        ' (' +
        resp.category.type.name +
        ')';

      await sendEmail({
        to: resp.user.email,
        subject: subject,
        html: template,
      });
    } else {
      return { message: 'Info to send mail not found', status: HttpStatusCodes[404] };
    }

    return { message: 'Success', data: { resp }, status: HttpStatusCodes[200] };
  }
}

export default UserBudgetService;
