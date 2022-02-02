export default function api() {
   // Pego a div pai para ser usada na criação de elementos (img x video)
  let divPai = $('.divPai')
  let input = $('.input').val()
  let data = document.querySelector('.input')

  // Executa a função quando carrega a tela
  $(document).ready(function() {
    pegaAPI();
})

  // Função para mudar a tela de acordo com a nova data
  const botao = $('.botaoPesquisar')
  botao.on('click', function(){
    let valorData = data.value
    input = valorData
    console.log(input)
  })

   // Função para buscar os elementos
  function pegaAPI() {
    const xhr = $.ajax({
    method: "GET",
    url:`https://api.nasa.gov/planetary/apod?api_key=hSDYPWq10rdn2gUryUeuUbBqCla3FznDZDqRWuSn&date=${input}`,
    // Em caso de sucesso, vai executar a função
    success: function() {
    // Adicionando elementos à tela
    let titulo = $('.titulo-apod').text(xhr.responseJSON.title)
    let data = $('.data-apod').text(xhr.responseJSON.date)
    let explanation = $('.explanation-apod').text(xhr.responseJSON.explanation)
    // Pego media type para saber se é imagem ou vídeo
    let mediaType = xhr.responseJSON.media_type

    // Se media-type for imagem, vou criar objeto de img
    if (mediaType == 'image') {
      // Crio o elemento HTML
      let img = $('<img>')
      // Crio uma variavel pra segurar o url
      let imgUrl = xhr.responseJSON.url

      // Adiciono atributo src e defino url
      img.attr('src', imgUrl)

      // Adiciono atributo class
      img.attr('class', 'img-apod img-fluid text-center')

      // Coloco como filho da div pai
      divPai.append(img)

    } else {       
      //Criando o elemento de vídeo
      let video = $('<iframe>')

      // Crio uma variavel pra segurar o url
      let videoUrl = xhr.responseJSON.url

      // Adiciono atributo src e defino url
      video.attr('src', videoUrl)

      // Adiciono atributo class
      video.attr('class', "embed-responsive-item")

      // Coloco como filho da div pai
      divPai.append(video)
    }
    // console.log(xhr.responseJSON)
    },
  })
  }
  
  function alteraAPI() {

  }

  
  
}
