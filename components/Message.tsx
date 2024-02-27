import { Alert } from "react-bootstrap"

const Message = ({variant, children }) => {
  return (
    <Alert className={`${variant === "danger" ? ' bg-red-100 text-[#ff5921]' : ''}  flex items-center mx-4 mt-3 mb-12 justify-center text-center`} variant={variant}>
        {children}
    </Alert>
  )
}
Message.defaultProps = {
  variant: 'info'
}
export default Message