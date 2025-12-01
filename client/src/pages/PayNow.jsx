import GPayButton from "../components/user/GooglePayButton"

const PayNowPage = () => {
  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Upgrade to Premium</h1>
      <p className="mb-6">Get premium features for just $5/month</p>
      <GPayButton />
    </div>
  )
}

export default PayNowPage
