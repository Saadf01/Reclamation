<template>
    <div id="section" ref="section" :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="title_section">
            <button class="section-toggle" @click="ToggleSection">
                <span class="material-icons">arrow_right</span>
                <h2>Pièces Jointes</h2>
            </button>
        </div>

        <div class="donnees">
            <div class="attachments">
                <div v-for="(attachment, index) in attachments" :key="index" class="attachment">
                    <span class="filename">{{ attachment.name }}</span>
                    <button @click="downloadAttachment(attachment)"><span class="material-icons">download</span></button>
                    <button @click="viewAttachment(attachment)"><span class="material-icons">visibility</span></button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "false")

// Exemple de pièces jointes
const attachments = ref([
    { name: 'Document 1.pdf', url: '../src/assets/Diagramme de classe omrane.pdf' },
    { name: 'Image.png', url: '../src/assets/logo.png' }
])

const ToggleSection = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem("is_expanded", is_expanded.value.toString())
}

const downloadAttachment = (attachment) => {
    // Logique pour télécharger l'attachement
    console.log('Téléchargement de:', attachment.name)
}

const viewAttachment = (attachment) => {
    // Logique pour visualiser l'attachement
    console.log('Visualisation de:', attachment.name)
}
</script>

<style lang="scss" scoped>

#section {
    background-color: white;
    border-top: 4px solid rgb(0, 147, 215);
    border-radius: 5px;
    width: 100%;
    transition: 0.3s ease-in-out;
    max-height: calc(0rem + 32px);

    .title_section {
        background-color: rgb(229, 229, 229);

        .section-toggle {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0.3rem 1rem;
            transition: 0.2s ease-in-out;

            .material-icons {
                font-size: 2rem;
                transition: 0.2s ease-out;
            }

            &:hover {
                h2,
                .material-icons {
                    color: var(--primary);
                }
            }

            &:focus {
                outline: none;
            }

            h2 {
                font-size: 1.1rem;
                font-family: 'Poppins', sans-serif;
                margin-left: 0.2rem;
                transition: 0.2s ease-out;
            }
        }
    }

    .donnees {
        opacity: 0;
        padding: 1rem 1rem;
        transition: opacity 0.2s ease-out;

        .attachments {

            .attachment {
                display: flex;
                align-items: center;
                margin-bottom: 9px;

                .material-icons {
                    color:rgb(65, 65, 65);
                    transition: 0.2s ease-out;
                }

                .material-icons:hover {
                    color:var(--primary)
                }
                
                .filename {
                    font-family: 'Poppins', sans-serif;
                }

                button {
                    margin-left: 1rem;
                }
            }
        }
    }

    &.is-expanded {
        max-height: 50rem;

        .title_section {
            .material-icons {
                transform: rotate(90deg);
            }
        }

        .donnees {
            opacity: 1;
        }

        

        
    }
}
</style>
