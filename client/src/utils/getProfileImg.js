const getProfileImg = ({ gender, username }) => {
  const genderField = gender === "male" ? "boy" : "girl"
  
  return `https://avatar.iran.liara.run/public/${genderField}?username=${username}`
}

export default getProfileImg