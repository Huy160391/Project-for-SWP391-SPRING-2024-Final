import React from 'react';

const AgentProfile = () => {
  // Mock data for the agent
  const agent = {
    name: 'Alexander Sterling',
    location: 'Quận 1, TP. Hồ Chí Minh',
    phone: '0123456789',
    email: 'abc@gmail.com',
    introduction: 'Tham gia chuỗi đại lý của Vinhomes từ ngày 14/05/2012. Chuyên tư vấn, thẩm định, quản lý chuỗi các căn hộ của Vinhomes khu vực Hồ Chí Minh.'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src="/path-to-agent-image.jpg" // Replace with the path to your agent's image
          alt={agent.name}
        />
        <div>
          <h2 className="text-2xl font-bold">{agent.name}</h2>
          <p className="text-gray-600">{agent.location}</p>
          <p className="text-gray-600">{agent.phone}</p>
          <p className="text-blue-600">{agent.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">GIỚI THIỆU</h3>
        <p className="text-gray-600 mt-2">{agent.introduction}</p>
      </div>
    </div>
  );
};

export default AgentProfile;
