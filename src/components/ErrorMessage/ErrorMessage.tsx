import { BsEmojiFrown } from "react-icons/bs";
import css from './ErrorMessage.module.css'

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={css.errorMessageContainer} style={{ color: 'red', fontWeight: 'bold' }}>
      <BsEmojiFrown color="red" size={35}/>
      {message}
    </div>
  );
}

export default ErrorMessage;