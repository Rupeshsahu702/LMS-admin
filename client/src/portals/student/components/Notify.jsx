import { useDispatch } from 'react-redux';

import { addNotification } from '@/redux/slices';

const Notify = () => {
  const dispatch = useDispatch();
  const myArray = ['success', 'error', 'warning', 'info', 'course'];

  const handleSomeAction = () => {
    const notificationType = myArray[Math.floor(Math.random() * myArray.length)];
    dispatch(
      addNotification({
        title: `${notificationType}!`,
        message: 'Your action was completed successfully.',
        type: notificationType,
      }),
    );
  };

  return <button onClick={handleSomeAction}>Notify</button>;
};

export default Notify;
