import { BsBellFill, BsBellSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function NotiBtn() {
  const navigate = useNavigate();
  const status = true;

  return <>{status ? <BsBellFill size="26" className="cursor-pointer" /> : <BsBellSlashFill size="26" className="opacity-60" />}</>;
}
