# Dépôt de fichier

## TODO:

-   [x] Minimize Tailwind Style file
-   [] Create real style 😅
-   [] Create User Page
-   [] Disable Twitter/Insta button in Admin

## Possible Upgrade

-   [] Segment upload by theme in seperate folders
    -   [] Managable in Admin
    -   [] Segment in accordeon in Admin
    -   [] Checklist typo viewed/reviewed

## TEMP

{{#each repos}}
<div class="flex flex-col text-gray-900 bg-gray-50 w-56 h-56 items-stretch">
<div class="flex w-full justify-between text-gray-600 text-sm font-light">
<span class="flex-start">Fichier {{ fileExtension }}</span>
<span class="flex-end">{{ dateRepo }}</span>
</div>
<div class="mt-4 flex capitalize text-xl font-semibold">
{{nickname}} {{name}}
</div>
<div class="mt-auto flex justify-between">
<div class="inline-flex gap-2">
<a href="https://twitter.com/{{socialNetwork.twitter}}" target="_blank" rel="noopener noreferrer">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="currentColor">
<path
                                        d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
</svg>
</a>
<a href="https://instagram.com/{{socialNetwork.instagram}}" target="_blank" rel="noopener noreferrer">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="currentColor">
<path
                                        d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
</svg>
</a>
</div>
<div class="inline-flex">
<a href="/uploads/{{file}}" target="_blank" rel="noopener noreferrer">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
<path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
</svg></a>
</div>
</div>
</div>
{{/each}}
