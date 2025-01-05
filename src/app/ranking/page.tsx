import Layout from "@/components/common/Layout";

export function ForumPage() {
  // Sample rank data - you can replace this with your actual data
  const ranks = [
    {
      title: "Grand Master",
      replies: 245,
      views: 1200,
      activity: "2d",
      users: ["user1", "user2", "user3"],
    },
    {
      title: "Master",
      replies: 180,
      views: 890,
      activity: "14h",
      users: ["user4", "user5"],
    },
    {
      title: "Diamond",
      replies: 150,
      views: 750,
      activity: "4h",
      users: ["user6", "user7", "user8"],
    },
  ];

  return (
    <div>
      <Layout>
        <div className="min-h-screen  text-gray-100">
          {/* Header section */}
          <div className="border-b border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                <button className="px-3 py-1 text-sm bg-gray-800 rounded-md hover:bg-gray-700">
                  categories
                </button>
                <button className="px-3 py-1 text-sm bg-gray-800 rounded-md hover:bg-gray-700">
                  tags
                </button>
              </div>
              <div className="flex space-x-4">
                <span className="text-blue-400 border-b-2 border-blue-400">
                  Top
                </span>
                <span className="text-gray-400 hover:text-gray-200">
                  Latest
                </span>
                <span className="text-gray-400 hover:text-gray-200">
                  Categories
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <h2 className="text-2xl font-bold">Week</h2>
              <span className="ml-2 text-gray-400">DEC 29 – JAN 4</span>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 text-gray-400">
            <div className="col-span-1">Rank</div>
            <div className="text-center">Replies</div>
            <div className="text-center">Views</div>
            <div className="text-center">Activity</div>
          </div>

          {/* Rank items */}
          <div className="divide-y divide-gray-700">
            {ranks.map((rank, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-800"
              >
                <div className="col-span-1">
                  <div className="flex items-center">
                    <span className="text-gray-100 font-medium">
                      {rank.title}
                    </span>
                  </div>
                </div>
                <div className="text-center text-amber-500">{rank.replies}</div>
                <div className="text-center text-gray-400">{rank.views}</div>
                <div className="text-center text-gray-400">{rank.activity}</div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ForumPage;
