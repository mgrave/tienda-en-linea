import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
    isPaid: boolean;
}


export const OrderStatus = ({isPaid}:Props) => {
  return (
    <div className={
        clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
            {
                'bg-red-500': !isPaid,
                'bg-green-700': isPaid,
            }
        )
      }>
        <IoCardOutline size={30}></IoCardOutline>
        {/* <span className="mx-2">Pending payment</span> */}
        <span className="mx-2">
            {
               isPaid ? 'Paid' : 'Not paid'
            }
            </span>
      </div>
  )
}
