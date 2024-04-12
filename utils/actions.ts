'use server'
import { revalidatePath } from 'next/cache'
import db from './db'

export const getResellerId = async (data) => {
  const resellerIdField = data.get('resellerId')
  // const reseller = await db.reseller.findUnique({
  //   where: {
  //     resellerId: resellerIdField,
  //   },
  // })
  revalidatePath(`/resellers/${resellerIdField}`)
}
