import { IPost } from "@/models/postType";

const postData: IPost = {
  title: "Las Pinas - DLSU Manila",
  body: "# Hello! \n **Can you tell any possible way of commuting from Las Pinas to DLSU-Manila?** Also may I know the details of commute such as: complete steps of commuting, price each transpo, and average total duration.",
  tags: ["Manila", "Hololive", "Glasses"],
  postDate: new Date("February 10, 2020"),
  username: "Fubuki",
  images: ["src/mockdata/images-1/LRT-1.jpg", "src/mockdata/images-1/LRT-2.jpg", "src/mockdata/images-1/MRT-3.jpg"],
  comments: [
    {
      username: "JamesPH",
      replyTo: "Fubuki",
      postDate: new Date(),
      commentID: "1",
      body: "Hi, from any part of Las Pinas, go to Zapote side of Alabang-Zapote road. Then go the bus showing \"V. Cruz\" or \"Taft\" sign. There, those guarantee you to head straight to DLSU Manila. Duration and price varies from starting point. Hailing from barangay Pilar, price is p48 per student head and duration takes 1 hour if outside rush hours.",
      replies: [
        {
          username: "Fubuki",
          replyTo: "JamesPH",
          postDate: new Date(),
          commentID: "2",
          body: "Thanks. What's the price and duration if I start from Perpetual at Times?",
          replies: []
        }
      ]
    },
    {
      username: "RailwayGuy",
      replyTo: "Fubuki",
      postDate: new Date(),
      commentID: "3",
      body: "You may use bus going to PITX then go to 3rd floor to use train going to Vito Cruz Station. Price from bus varies. PITX to V Cruz takes average ~15min duration and p22 if using beepcard",
      replies: [
        {
          username: "Fubuki",
          replyTo: "RailwayGuy",
          postDate: new Date(),
          commentID: "4",
          body: "Which side of the train going northwards?",
          replies: [
            {
              username: "RailwayGuy",
              replyTo: "Fubuki",
              postDate: new Date(),
              commentID: "5",
              body: "Go to the other side from the entry point. Use the bridge that is going to the other side.",
              replies: []
            }
          ]
        }
      ]
    },
    {
      username: "AngkasIsLife",
      replyTo: "Fubuki",
      postDate: new Date(),
      commentID: "6",
      body: "Same for the reverse process using bus showing any of these signs: SM Southmall, Pilar, Casimiro, Moonwalk, or Times",
      replies: []
    },
    {
      username: "Fubuki",
      replyTo: "self",
      commentID: "7",
      postDate: new Date(),
      body: "If from Pitx, which gate am I going to use to go home in Las Pinas",
      replies: [
        {
          username: "CavitexUser",
          replyTo: "Fubuki",
          commentID: "8",
          postDate: new Date(),
          body: "gate 8",
          replies: []
        },
        {
          username: "CavitexUser",
          replyTo: "Fubuki",
          commentID: "8",
          postDate: new Date(),
          body: "gate 8",
          replies: []
        }
      ]
    }
  ]
}

export default postData;