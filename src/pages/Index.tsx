import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Анна',
      text: 'Привет! Как дела?',
      time: '10:24',
      isOwn: false
    },
    {
      id: 2,
      user: 'Я',
      text: 'Отлично! Работаю над новым проектом 🚀',
      time: '10:25',
      isOwn: true
    },
    {
      id: 3,
      user: 'Максим',
      text: 'Кто сегодня будет на встрече?',
      time: '10:26',
      isOwn: false
    },
    {
      id: 4,
      user: 'Я',
      text: 'Я точно буду, Анна тоже подтвердила',
      time: '10:27',
      isOwn: true
    }
  ]);

  const [users] = useState([
    { name: 'Анна', status: 'online', avatar: 'АК' },
    { name: 'Максим', status: 'online', avatar: 'МП' },
    { name: 'София', status: 'away', avatar: 'СВ' },
    { name: 'Дмитрий', status: 'offline', avatar: 'ДР' },
    { name: 'Елена', status: 'online', avatar: 'ЕМ' }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'Я',
        text: message,
        time: new Date().toLocaleTimeString('ru', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'away': return 'Отошёл';
      default: return 'Не в сети';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex">
      {/* Боковая панель с пользователями */}
      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-blue-100 flex flex-col">
        <div className="p-6 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Icon name="MessageCircle" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Чат</h1>
              <p className="text-sm text-gray-500">{users.filter(u => u.status === 'online').length} в сети</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <h2 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
            <Icon name="Users" size={16} />
            Участники
          </h2>
          <div className="space-y-3">
            {users.map((user, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 cursor-pointer group">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-blue-100">
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 ${getStatusColor(user.status)} rounded-full border-2 border-white`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500">{getStatusText(user.status)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Основная область чата */}
      <div className="flex-1 flex flex-col">
        {/* Заголовок чата */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                <Icon name="Hash" size={16} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Общий чат</h2>
                <p className="text-sm text-gray-500">Активен сейчас</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Icon name="Phone" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Icon name="Video" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Icon name="Settings" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Область сообщений */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`flex gap-3 max-w-lg ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                <div className="relative">
                  <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                    <AvatarFallback className={`text-white font-medium text-sm ${
                      msg.isOwn 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-r from-gray-400 to-gray-500'
                    }`}>
                      {msg.user === 'Я' ? 'Я' : msg.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-3 rounded-2xl max-w-sm shadow-sm ${
                    msg.isOwn
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                      : 'bg-white border border-gray-100 text-gray-900 rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 text-xs text-gray-400 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                    <span>{msg.time}</span>
                    {msg.isOwn && <Icon name="Check" size={12} className="text-blue-400" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Поле ввода */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-blue-100 p-4">
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Icon name="Paperclip" size={18} />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                className="pr-12 border-gray-200 focus:border-blue-300 focus:ring-blue-200 rounded-xl bg-white/70"
              />
              <Button
                onClick={sendMessage}
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Icon name="Smile" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;