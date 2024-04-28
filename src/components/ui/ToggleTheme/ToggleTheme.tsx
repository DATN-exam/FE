import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { THEMES } from '@/config/define'
import { useTheme } from '@/contexts/Theme'
import { cn } from '@/lib/utils'
import { Theme } from '@/types'

function ToggleTheme() {
  const { theme, setTheme } = useTheme()
  const themesArray = Object.entries(THEMES)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-center items-center">
          <i className={THEMES[theme].iconClassName}></i>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        {themesArray.map(([themeKey, themeObj]) => (
          <DropdownMenuItem key={themeKey} className={cn(theme == themeKey ? 'bg-accent' : '')}>
            <button
              className="w-full flex items-center gap-3 text-base"
              onClick={() => setTheme(themeKey as Theme)}
            >
              <div className="flex justify-center items-center w-6">
                <i className={themeObj.iconClassName}></i>
              </div>
              <span>{themeObj.text}</span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ToggleTheme
