function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img className="rounded-full border p-[2px] w-16 h-16" src="https://i.pinimg.com/736x/9d/bf/50/9dbf507905e2f34b3e6b11673a23ba4f.jpg" alt="" />
      
      <div className="flex-1 mx-4">
        <h2 className="font-bold">iam_athena</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button className="text-blue-400 text-sm font-semibold">Sign out</button>
    </div>
  );
}

export default MiniProfile;
