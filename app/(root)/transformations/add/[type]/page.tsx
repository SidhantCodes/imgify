import Header from '@/components/shared/Header'
import React from 'react'

import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'


const AddTransformationTypePage = async ({ params, searchParams }: SearchParamProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, type } = await params
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchParamsData = await searchParams;
  // const transformation = transformationTypes[type]
  const transformation = transformationTypes[type] || { title: "Unknown", subTitle: "Invalid type" };
  const { userId } = await auth();
  // console.log(userId)
  if(!userId) redirect('/sign-in');

  const user = await getUserById(userId);

  return (
    // <div>AddTransformationTypePage</div>
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className='mt-10'>
        <TransformationForm 
          action='Add'
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage
