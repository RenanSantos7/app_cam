#!/bin/bash

# Pegar o nome do projeto a partir do nome da pasta
# project_name=$(basename "$PWD")

# Remover uso do npm
rm -rf node_modules/
rm -f package-lock.json

# Instalar dependências yarn
yarn

# Instalar bibliotecas
yarn add expo-navigation-bar react-native-svg react-native-safe-area-context
yarn add -D prettier
echo "=> Instaladas dependências"

# Configurar prettier
echo "{
  \"arrowParens\": \"avoid\",
  \"jsxSingleQuote\": true,
  \"printWidth\": 80,
  \"singleQuote\": true,
  \"tabWidth\": 4,
  \"useTabs\": true
}
" > .prettierrc

# Criar as pastas 'components', 'contexts' e 'pages'
mkdir -p src/components/layout src/contexts src/pages/Home src/assets src/types src/utils src/routes

# Criar arquivos
touch src/types/index.tsx

# Criar o componente Page
echo "import { StatusBar, StatusBarStyle, StyleSheet, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

interface PageProps {
	children: ReactNode;
}

export default function Page(props: PageProps) {
	const [statusBarStyle, setStatusBarStyle] =
		useState<StatusBarStyle>('dark-content');
	const [bgStatusBar, setBgStatusBar] = useState('white');
	
	useEffect(() => {
		NavigationBar.setBackgroundColorAsync(theme.cores.background.card);
		NavigationBar.setButtonStyleAsync('dark');
	}, []);

	return (
		<View>
			<StatusBar
				barStyle={statusBarStyle}
				backgroundColor={bgStatusBar}
			/>

			{props.children}

			{/* Outros componentes */}
		</View>
	);
}" > src/components/layout/Page.tsx
echo "=> Criado componente Page"

# Criar o arquivo DataContext.tsx dentro de 'src/contexts'
echo "import { createContext, useState, useEffect, ReactNode } from 'react'

interface IDataContext {
	
}

const DataContext = createContext<IDataContext>(null);

export default function DataProvider ({ children }:{children: ReactNode}) {
    const [, ] = useState([]);
    
    return (
        <DataContext.Provider value={{ ,  }}>
            {children}
        </DataContext.Provider>
    )
}

export function useDataContext() {
	return useContext(DataContext);
}
" > src/contexts/DataContext.tsx
echo "-> criado arquivo contexts/DataContext.tsx"

# Alterar o conteúdo do tsconfig.json
echo "{
	\"extends\": \"expo/tsconfig.base\",
	\"compilerOptions\": {
		//Modules
		\"module\": \"ES2015\",
		\"allowImportingTsExtensions\": true,

		// Interop Constraints
		\"isolatedModules\": true,
		\"forceConsistentCasingInFileNames\": true,

		// Type Check
		\"strict\": true,
		\"strictNullChecks\": false,
		\"noUnusedLocals\": false,
		\"noUnusedParameters\": false,
		\"noFallthroughCasesInSwitch\": true,
	},
}
" > tsconfig.json
echo "-> modificado tsconfig.json"

# Acrescentar 'pnpm-lock.yaml' ao .gitignore
echo "pnpm-lock.yaml
yarn.lock
package-lock.json
" >> .gitignore

# Fazer commit
git branch -m master main && git add . && git commit -m ':tada: app configurado'
echo "-> feito primeiro commit"

