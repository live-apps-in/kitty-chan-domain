import { injectable } from 'inversify';
import Violation from '../../model/violation';

@injectable()
export class ViolationRepository {
  async create(payload: any): Promise<void> {
    const saveData = new Violation(payload);
    await saveData.save();
  }

  async getByUserId(userId: string) {
    const violations = await Violation.find({
      userId,
    });
    return violations;
  }

  async countViolationByType(
    userId: string,
    guildId: string,
    type: string,
  ): Promise<number> {
    const violations = await Violation.countDocuments({
      userId,
      type,
    });
    return violations;
  }

  async update(userId: string, guildId: string, type: string) {
    const violations = await Violation.updateOne(
      { userId, type },
      {
        $inc: { count: 1 },
      },
    );

    return violations;
  }
}
