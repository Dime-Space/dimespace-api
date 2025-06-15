import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ChatRepository } from './chat.respository'
import { CreateChatDTO } from './dtos/create-chat.dto'
import { UserRepository } from 'src/user/user.repository'
import { CompanyRepository } from 'src/company/company.repository'

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async create(userId: number, createChatDTO: CreateChatDTO) {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    const company = await this.companyRepository.findById(createChatDTO.companyId)
    if (!company) throw new HttpException('Company not found', HttpStatus.NOT_FOUND)

    const chatAlreadyExists = await this.chatRepository.findOne({
      where: { user: { id: userId }, company: { id: createChatDTO.companyId } },
    })
    if (!!chatAlreadyExists) throw new HttpException(`Chat already exists`, HttpStatus.BAD_REQUEST)

    const chat = this.chatRepository.create({
      company: { id: createChatDTO.companyId },
      user: { id: userId },
      name: `${company.name} - ${user.name}`,
    })
    await this.chatRepository.save(chat)

    const chatDetails = await this.chatRepository.findOne({
      where: { id: chat.id },
      select: {
        id: true,
        name: true,
        created_at: true,
        user: {
          id: true,
          name: true,
        },
        company: {
          id: true,
          name: true,
        },
      },
      relations: ['user', 'company'],
    })

    return chatDetails
  }

  async findById(id: number) {
    const chat = await this.chatRepository.findOne({
      where: { id },
      relations: ['messages', 'messages.user'],
      order: { messages: { created_at: 'DESC' } },
      select: {
        id: true,
        name: true,
        created_at: true,
        user: { id: true, name: true },
        company: { id: true, name: true },
        messages: {
          id: true,
          content: true,
          created_at: true,
          user: { id: true, name: true },
        },
      },
    })
    if (!chat) throw new HttpException('Chat not found', HttpStatus.NOT_FOUND)
    return chat
  }

  async list(userId: number) {
    const chat = await this.chatRepository.find({
      where: { user: { id: userId } },
      select: {
        id: true,
        name: true,
        created_at: true,
        user: {
          id: true,
          name: true,
        },
        company: {
          id: true,
          name: true,
        },
      },
      relations: ['user', 'company'],
    })
    return chat
  }
}
