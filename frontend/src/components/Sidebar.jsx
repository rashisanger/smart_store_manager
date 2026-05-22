const Sidebar = () => {
    return (
        <div className="w-64 min-h-screen bg-[#111827] border-r border-slate-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-10">
                SmartStore
            </h2>

            <div className="space-y-4">
                <div className="text-slate-300 hover:text-white cursor-pointer transition">
                    Dashboard
                </div>

                <div className="text-slate-300 hover:text-white cursor-pointer transition">
                    Products
                </div>

                <div className="text-slate-300 hover:text-white cursor-pointer transition">
                    AI Tools
                </div>
            </div>
        </div>
    );
};

export default Sidebar;