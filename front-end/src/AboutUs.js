import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'

/**
 * A React component that represents the About Us page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about-us`)
      .then(response => {
        setAboutData(response.data)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <>
      <h1>About Us</h1>
      {error && <p className="error">{error}</p>}
      {!loaded && <p>Loading...</p>}
      {loaded && aboutData && (
        <div className="about-us-content">
          <img
            src={aboutData.photoUrl}
            alt={aboutData.name}
            className="profile-photo"
          />
          <h2>{aboutData.name}</h2>
          <p className="bio">{aboutData.bio}</p>
          <div className="contact-links">
            <a
              href={aboutData.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={aboutData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href={`mailto:${aboutData.email}`}>Email</a>
          </div>
        </div>
      )}
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
