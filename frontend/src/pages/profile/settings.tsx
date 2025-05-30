import Toggleswitch from "@/components/toggleswitch"
import { useLocalStorage } from "@/hook/storage";
import { ChangeEvent, memo, SyntheticEvent, useEffect, useState } from "react";
import { IUser } from "@/models/userType";
import { toast } from "react-toastify";
import { UserRoundPen } from "lucide-react";
import { useNavigate } from "react-router";
import { makeServerURL } from "@/helpers/url";

function Settings({
  user,
  setUser
} : {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}) {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.description);
  const [iconUrl, setIconUrl] = useState<string>(user.icon.imageUrl);
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = (e: SyntheticEvent<HTMLInputElement>) => {
    setTheme(e.currentTarget.checked ? "dark" : "light");
  }

  function handleAttachImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const newIconUrl = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setIconUrl(newIconUrl[0]);
    }
  }

  const handleSubmit = async () => {
    try {
      setDisabled(true);
      const formData = new FormData();
      formData.append("oldusername", user.username);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("bio", bio);

      if (iconUrl !== user.icon.imageUrl) {
        const blob = await fetch(iconUrl).then((res) => res.blob());
        formData.append("icon", new File([blob], "icon.jpg", { type: blob.type }));
      }

      const response = await fetch(makeServerURL(`/updateuser`), {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          toast.error(data.message)
        }
        else if (response.status === 401) {
          toast.error(data.message)
          navigate("/auth/login")
        }
        else if (response.status == 403) {
          toast.error(data.message)
          navigate("../")
        }
        else
          toast.error("Failed to update details.");
      } else {
        toast.success("Details updated successfully!");
        setUser(data.user);
      }
    } catch (error) {
      toast.error("An error has occurred.");
      console.error(error);
    } finally {
      setDisabled(false);
    }
  }

  /* Example usage:
  updateUser("650abc123def456ghi789jkl", {
    username: "newUsername",
    email: "newemail@example.com",
    bio: "This is my updated bio."
  }); */

  return (
    <div className="settings-container">
      <section>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username..."
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username} />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email..."
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email} />

        <label htmlFor="bio">Bio:</label>
        <textarea
          name="bio"
          id="bio"
          placeholder="Introduce yourself!"
          onChange={(e) => setBio(e.target.value)}
          value={bio} />

        <label htmlFor="icon">Icon:</label>
        <div className="settings-icon-container">
          <img src={iconUrl} alt="icon" className="profile-icon" />
          <button
            className="edit-button"
            onClick={() => document.getElementById("fileInput")?.click()}>
            <UserRoundPen className="icon" />
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="fileInput"
          multiple
          onChange={handleAttachImage} />

      </section>

      <button
        type="button"
        id="update"
        name="update"
        className="update-user"
        onClick={handleSubmit}
        disabled={isDisabled}>
          Update user
      </button>

      <h2>Web Interface</h2>
      <section>
        <label htmlFor="theme">Enable dark theme</label>
        <Toggleswitch name="theme" onClick={handleThemeToggle} defaultChecked={theme === "dark"} />
        {/*
        <label htmlFor="font-style">Customize font-style</label>
        <select name="font-style" id="font-style">
          <option value="times">times</option>
          <option value="roman">roman</option>
          <option value="new">new</option>
        </select>

        <label htmlFor="font-size">Customize font-size</label>
        <input type="number" name="font-size" id="font-size" /> */}
      </section>

      {/* <h2>User Privacy</h2>
      <section>
        <label htmlFor="anonymous">Allow username publicly displayed? </label>
        <Toggleswitch name="anonymous" />
      </section> */}

    </div>
  )
}

export default memo(Settings);
