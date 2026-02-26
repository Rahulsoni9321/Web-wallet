import { Globe, Instagram, Linkedin, X, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full h-16 bg-black dark:bg-black text-white dark:text-white flex justify-between px-6 items-center">
        <p>Designed and Developed by <b><i>Rahul Soni</i></b></p>
        <div className="flex gap-2 items-center">
            <a href="https://drive.google.com/file/d/1rhB9aWAa-lR6dytNlKw94Dn0Ns7pC8AN/view?usp=sharing" target="_blank">Resume</a>
            <Globe></Globe>
            <Instagram></Instagram>
            <X></X>
            <Youtube></Youtube>
            <Linkedin></Linkedin>
            
            
        </div>
        </div>
  )
}

export default Footer