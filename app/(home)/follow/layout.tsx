import TabsNav from "@/components/TabsNav"

export default async function ProfileLayout({
    children
  }: Readonly<{
    children: React.ReactNode
  }>)  {

    return (
        <div className="w-full mx-auto max-w-7xl h-screen p-5 lg:p-10">
          <div className="w-full mb-10  flex items-center justify-between p-2 sm:p-5 md:p-6 lg:p-7">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold font-cursive">Your Connections</h1>

            <button className="rounded-full bg-pink-500 px-4 py-2 hover:bg-pink-700 text-white cursor-pointer tracking-wider flex items-center">Our Writers</button>
          </div>


            <TabsNav
              tabs={[{name : "followers" , url : "/follow/followers"},
                      {name : "following" , url : "/follow/following"}]}
            />
          

          {children}
        </div>
    )
  }  