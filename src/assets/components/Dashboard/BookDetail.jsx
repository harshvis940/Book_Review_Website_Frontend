import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import { getImageSrc } from "../../../static/DefaultExports";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function BookDetail() {
  const location = useLocation();
  const book = location.state?.book;
  const [isInReadingList, setIsInReadingList] = useState(false);
  console.log(book);

  const handleAddToReadingList = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("user not prese");
      // return;
    }

    const readingListKey = `readingList_${userId}`;
    const existingList = JSON.parse(
      localStorage.getItem(readingListKey) || "[]"
    );

    if (isInReadingList) {
      // Remove from reading list
      const updatedList = existingList.filter((item) => item.id !== book.id);
      localStorage.setItem(readingListKey, JSON.stringify(updatedList));
      setIsInReadingList(false);
      setSnackbarMessage("Removed from reading list");
      setSnackbarSeverity("info");
    } else {
      // Add to reading list
      const bookToAdd = {
        id: book.id,
        title: book.title,
        authors: book.authors,
        coverImageURL: book.coverImageURL,
        genres: book.genres,
        addedAt: new Date().toISOString(),
      };
      existingList.push(bookToAdd);
      localStorage.setItem(readingListKey, JSON.stringify(existingList));
      setIsInReadingList(true);
      setSnackbarMessage("Added to reading list!");
      setSnackbarSeverity("success");
    }
  };

  useEffect(() => {
    // Check if book is already in reading list
    const userId = localStorage.getItem("userId");
    if (userId && book?.id) {
      const readingList = JSON.parse(
        localStorage.getItem(`readingList_${userId}`) || "[]"
      );
      setIsInReadingList(readingList.some((item) => item.id === book.id));
    }
  }, [book]);

  const review = [
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
  ];

  const bookDescription = [
    {
      Format: "Paper Black",
    },
    {
      ISBN: book.isbn,
    },
    {
      Pages: "580",
    },
    {
      "Reading Time": "2 Hours",
    },
    {
      Dimension: "243x120nm",
    },
    {
      Published: book.publicationYear,
    },
    {
      Genre: book.genres,
    },
  ];

  return (
    <>
      {/* Custom scrollbar styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background:rgb(222, 222, 223);
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background:rgb(103, 103, 103);
          }

          .reading-list-btn {
            transition: all 0.3s ease;
          }

          .reading-list-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
        `}
      </style>

      <div className="h-screen grid grid-cols-[40%_60%]">
        {/* Left: Book Image (40%) - Fixed */}
        <div className="flex bg-white p-10 h-screen sticky top-0">
          <img
            src={getImageSrc(book?.coverImageURL)}
            alt="Book"
            className="w-full object-contain"
          />
        </div>

        {/* Right: Book Details (60%) - Scrollable */}
        <div className="py-10 flex flex-col h-screen overflow-y-auto custom-scrollbar">
          <h1 className="text-4xl font-bold mb-6 px-5">{book.title}</h1>
          <p className="text-xl mb-2 px-5">Author: {book.authors}</p>
          <p className="text-xl mb-2 px-5">Genre: {book.genres}</p>
          <p className="text-xl mb-2 px-5">Price: ₹499</p>
          <p className="text-xl mb-6 px-5">Rating: ⭐⭐⭐⭐☆</p>
          <p id="demo-radio-buttons-group-label" className="px-5">
            Choose prefered format
          </p>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Paperbook"
            name="radio-buttons-group"
            className="flex flex-col px-5"
          >
            <FormControlLabel
              value="Paperbook"
              control={<Radio />}
              label="Paperbook"
            />
            <FormControlLabel value="Ebook" control={<Radio />} label="Ebook" />
          </RadioGroup>
          <div className="w-150 mt-5 flex flex-row gap-5 px-5">
            <Button variant="contained">Buy Now</Button>
            <Button variant="outlined">Add to cart</Button>
            <Button
              variant="outlined"
              startIcon={
                isInReadingList ? <BookmarkIcon /> : <BookmarkBorderIcon />
              }
              onClick={handleAddToReadingList}
              className="reading-list-btn"
              sx={{
                borderColor: isInReadingList
                  ? "#1976d2"
                  : "rgba(0, 0, 0, 0.23)",
                color: isInReadingList ? "#1976d2" : "rgba(0, 0, 0, 0.87)",
                "&:hover": {
                  borderColor: "#1976d2",
                  backgroundColor: isInReadingList
                    ? "rgba(25, 118, 210, 0.08)"
                    : "transparent",
                },
              }}
            >
              {isInReadingList ? "In Reading List" : "Add to Reading List"}
            </Button>
          </div>

          <p className="mt-10 text-xl px-5">Book summary</p>
          <p className="mt-3 px-5 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            vitae adipisci reprehenderit omnis hic quo fugiat ipsa ipsam enim
            maxime id commodi dolor earum perferendis blanditiis quasi nostrum
            ex, laudantium deserunt unde libero explicabo? Placeat, blanditiis
            praesentium omnis amet porro inventore. Amet aperiam ipsa voluptatum
            nostrum vel iure, eaque deserunt accusantium dolores velit
            laboriosam impedit ea sunt autem odio! Omnis totam iusto, eius ipsam
            saepe labore molestias veniam qui ipsum, veritatis dolore nihil
            rerum repellat, asperiores corporis ratione quos. Ab nesciunt
            nostrum, eum minus possimus eaque animi et doloremque earum harum
            magnam ut minima. Sequi placeat optio dolores, nisi architecto quod!
            Doloremque, cum quibusdam beatae quae tenetur ullam odit molestiae,
            sunt, corrupti odio earum quas? Amet eaque a explicabo nesciunt
            quam. Deleniti voluptatibus aliquid sint ipsa ab consequuntur,
            voluptatum, voluptates a dignissimos voluptatem totam ea ipsam earum
            architecto assumenda laborum inventore eius porro cumque vel impedit
            eveniet nihil rerum molestias. Soluta quod vitae sint omnis beatae
            architecto, consectetur voluptates explicabo aperiam eum fugiat
            fugit, aspernatur tenetur laboriosam magni amet, aliquam quidem iure
            dicta natus dolorum repudiandae laborum! Obcaecati voluptatibus sed
            ratione reprehenderit odio placeat eum eligendi adipisci saepe,
            cumque debitis et numquam cupiditate iure dicta nemo magni!
            Doloribus, distinctio id.
            {book.summary}
          </p>

          <p className="mt-10 text-xl font-semibold px-5">Book Description</p>
          <div className="mt-3 space-y-2 px-5">
            {bookDescription.map((item, index) => {
              const [key, value] = Object.entries(item)[0];
              return (
                <div key={index} className="text-lg">
                  <p>
                    <strong>{key}:</strong> {value}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-zinc-100 mt-2 px-5 py-3">
            <p>Reviews</p>
            <p className="mb-3">See what people think about Tile of the book</p>

            <div className="flex flex-row gap-3">
              <p>4.0</p>
              <p>⭐️⭐️⭐️⭐️⭐️</p>
            </div>
            <p>40 reviews/28 ratings</p>
            <p className="mt-3">What would you rate this book</p>
            <p>⭐️⭐️⭐️⭐️⭐️</p>

            <p className="mt-3">Tell us what do you think</p>
            <textarea
              className="border-1 w-100 p-3 rounded-md"
              name=""
              id=""
              placeholder="Write review"
            ></textarea>
            <div className="bg-white w-30 p-3 text-center rounded-md">
              <p className="hover:cursor-pointer">Post</p>
            </div>

            {review.map((val, key) => (
              <div
                key={key}
                className="mt-4 flex gap-2 flex-col border-b-2 border-white"
              >
                <p className="font-semibold">{val.name}</p>
                <p>{val.stars}</p>
                <p className="break-words whitespace-pre-wrap w-full text-justify">
                  {val.reviews}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetail;
