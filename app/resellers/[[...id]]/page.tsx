const ResellerIdPage = ({ params }) => {
  console.log(params)
  const [id, name, email, ...rest] = params.id
  return (
    <div>
      Reseller ID: {id}, name:{name}
    </div>
  )
}

export default ResellerIdPage
