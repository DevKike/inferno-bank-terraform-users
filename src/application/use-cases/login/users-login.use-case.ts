import {
  IUserLoginBody,
  IUserLoginRes,
} from '../../../domain/entity/users.entity.interface';
import { BadRequestException } from '../../../domain/exceptions/bad-request.exception';
import { IUsersService } from '../../../domain/service/users.service.interface';
import { IUseCase } from '../../../domain/use-case/use-case.interface';
import { IHashProvider } from '../../../domain/providers/hash/interface/hash.provider.interface';
import { IJwtProvider } from '../../../domain/providers/jwt/interface/jwt.provider.interface';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';

export class UsersLoginUseCase
  implements IUseCase<IUserLoginBody, IUserLoginRes>
{
  constructor(
    private readonly _usersService: IUsersService,
    private readonly _hashProvider: IHashProvider,
    private readonly _jwtProvider: IJwtProvider
  ) {}

  async execute(input: IUserLoginBody): Promise<IUserLoginRes> {
    try {
      const user = await this._usersService.getByEmail(input.email);

      if (!user) throw new NotFoundException('User not found');

      const isPasswordValid = await this._hashProvider.compare(
        input.password,
        user.password
      );

      if (!isPasswordValid)
        throw new BadRequestException('Invalid email or password');

      const token = this._jwtProvider.sign({
        id: user.uuid,
        email: user.email,
        name: user.name,
      });

      const { uuid, email, password, document, address, image, ...userData } =
        user;

      return {
        user: userData,
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
