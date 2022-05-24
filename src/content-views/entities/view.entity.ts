import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class View {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
