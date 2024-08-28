import { ObjectType, Field, Int } from "@nestjs/graphql"

@ObjectType()
export class UserSchema{

  @Field(()=>Int)
  id:number

  @Field()
  name:string

  @Field()
  email:string

  @Field()
  password:string
}