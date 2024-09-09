import { GitHub } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import HomeForm from '../components/HomeForm'

type Feature = {
  img: string
  alt: string
  title: string
  desc: string
  github: string
  stars: number | null
}

type FeaturesCache = {
  date: string
  features: Feature[]
}



/**
 * Get stars count for github repositories and save values in cache in
 * localStorage.
 *
 * @returns {features: Feature[]}
 */
export async function loader() {
  const today = new Date().toDateString()
  const cacheValue = localStorage.getItem('farmd-features')
  if (cacheValue !== null) {
    const cache = JSON.parse(cacheValue) as FeaturesCache
    if ('date' in cache && cache.date === today) return { features: cache.features }
  }

  // const data = await Promise.all(
  //   FEATURES.map((feature) => fetch(`https://api.github.com/repos/${feature.github}`)),
  // )
  const results = await Promise.all(data.map((res) => res.json()))
  const features = FEATURES.map((feature, idx) => ({
    ...feature,
    stars: results[idx].stargazers_count,
  }))
  localStorage.setItem('farmd-features', JSON.stringify({ date: today, features }))

  return { features }
}

export default function Home() {
  const formatter = Intl.NumberFormat('en', { notation: 'compact', maximumSignificantDigits: 3 })

  return (
    <main>

      <Container >
        <Box sx={{ mb: 4 }}>
          <HomeForm></HomeForm>
        </Box>

      </Container>
    </main>
  )
}
