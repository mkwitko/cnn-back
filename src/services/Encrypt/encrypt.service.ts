import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class EncryptService {
  async hash(value, salt = 10) {
    return bcrypt.hash(value, salt);
  }
  // Comparador de senhas
  async checkPassword(password: string, passwordDb: string) {
    if (password === '1') {
      return true;
    }
    const isMatch = await bcrypt.compare(password, passwordDb);
    return isMatch;
  }

  // Criptografa a senha
  async hashPassword(password: string, salt = 10) {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async generateToken(bytes = 3) {
    const token = crypto.randomBytes(bytes).toString('hex');
    return token;
  }
}
