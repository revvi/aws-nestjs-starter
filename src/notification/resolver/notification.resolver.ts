import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNotificationInput } from '../model/create-notification.input';
import { Notification } from '../model/notification.model';
import { UpdateNotificationInput } from '../model/update-notification.input';
import { NotificationService } from '../service/notification.service';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(/* istanbul ignore next */ () => Notification)
  createNotification(@Args('input') input: CreateNotificationInput) {
    return this.notificationService.create(input);
  }

  @Mutation(/* istanbul ignore next */ () => Notification)
  updateNotification(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
    @Args('input') input: UpdateNotificationInput,
  ) {
    return this.notificationService.update({ id }, input);
  }

  @Query(/* istanbul ignore next */ () => [Notification])
  notification(@Args('userId') userId: string) {
    return this.notificationService.findByUserId(userId);
  }

  @Query(/* istanbul ignore next */ () => [Notification])
  notificationByTarget(@Args('targetId') targetId: string) {
    return this.notificationService.findByTargetId(targetId);
  }
}
