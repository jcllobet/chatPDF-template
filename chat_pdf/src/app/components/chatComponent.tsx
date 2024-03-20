import React from 'react'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { Send } from 'lucide-react'
import MessageList from '@/components/messageList'

interface Props {
  chatId: number
  pdfUrl: string
}

const ChatComponent = ({ chatId, pdfUrl }: Props) => {
  const [isQuestionnaireCompleted, setIsQuestionnaireCompleted] =
    React.useState(true)
  const [input, setInput] = React.useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle submit logic here
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }
  // Render chatbot UI
  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <div className="p-2 bg-white rounded-full">
        <h3 className="text-2xl font-bold pt-4 pl-4">Simplicaid Chat</h3>
      </div>

      {/* message list */}
      <div className="flex-grow overflow-auto pl-3" id="message-container">
        {/* Placeholder for messages */}
        <MessageList messages={[]} isLoading={false} />
      </div>
      {/* input form */}
      <form
        onSubmit={handleSubmit}
        className="flex-none px-2 py-4 bg-white rounded-lg"
      >
        <div className="flex pl-3 pb-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Enter..."
            className="w-full rounded-l-md"
          />
          <Button type="submit" className="bg-blue-600 ml-2 rounded-r-md">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatComponent
