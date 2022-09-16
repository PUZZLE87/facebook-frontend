const Contact = ({ user }) => {
  return (
    <div className="flex space-x-2 items-center hover:bg-gray-300 transition-colors cursor-pointer p-1 rounded-lg">
      <img
        src={user?.userInfo?.picture}
        alt=""
        className="rounded-full w-9 h-9 object-cover"
      />
      <p className="text-gray-700 font-semibold">
        {user?.userInfo?.first_name} {user?.userInfo?.last_name}
      </p>
    </div>
  );
};

export default Contact;
