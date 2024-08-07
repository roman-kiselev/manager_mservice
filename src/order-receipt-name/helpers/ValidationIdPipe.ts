import { Injectable, PipeTransform } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderReceiptNameDto } from '../dto/create-order-receipt-name.dto';

@Injectable()
export class ValidationIdPipe
    implements
        PipeTransform<CreateOrderReceiptNameDto, CreateOrderReceiptNameDto>
{
    constructor(private client: DatabaseService) {}
    transform(value: CreateOrderReceiptNameDto) {
        const { providerId, nameWorkId, orderReceiptId } = value;
        let idForProvider = 0;

        if (providerId === 0) {
            this.checkProviderId(providerId).then((data) => {
                idForProvider = data;
            });
        }
        console.log(providerId, nameWorkId, orderReceiptId);
        return {
            ...value,
            providerId: idForProvider,
        };
    }

    async checkProviderId(id: number) {
        try {
            if (id === 0) {
                const data = await this.client.providers.create({
                    data: {
                        name: 'Пусто',
                        address: 'Пусто',
                    },
                });

                console.log(data);
                return data.id;
            }
        } catch (e) {
            console.log(e);
        }
    }
}
