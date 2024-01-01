import VideoFrame from '@/components/VideoFrame'
import NameCard from '@/components/NameCard'

export default function Home() {
  
  return (
    <section className='w-full flex-col flex-center'>
        <h1 className='head_text text-center'>
          Gather &amp; Meet at
          <br className='max-md:hidden'/>
          <span className='orange_gradient'> UniCon </span>
        </h1>
        <p className='desc text-center'>
        UniCon is an open, free platform offer online learning capabilities 
        for students and teachers worldwide  
        </p>
        <div className='flex flex-col h-full '>
          <VideoFrame></VideoFrame>
          <NameCard></NameCard>
        </div>
    </section>
  )
}
